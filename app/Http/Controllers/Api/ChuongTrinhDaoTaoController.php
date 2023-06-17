<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChuongTrinhDaoTaoResource;
use App\Http\Resources\SectionAHeader_Resource;
use App\Http\Resources\SectionB_Resource;
use App\Models\ChuongTrinhDaoTao;
use App\Service\ChuongTrinhDaoTaoService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

class ChuongTrinhDaoTaoController extends Controller
{
    protected $ctdt;
    public function __construct(ChuongTrinhDaoTao $ctdt) 
    {
        $this->ctdt=$ctdt;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $ctdtService = new ChuongTrinhDaoTaoService();
        $listCTDT = $ctdtService->getList();
        return response()->json([
            'mainList'=>$listCTDT
        ], HttpResponse::HTTP_OK);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeCTDT(Request $request)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->updateCTDT($request);
        $itemResource = ChuongTrinhDaoTaoResource::collection($item);
        return response()->json([
            'id'=>intval($request['id']),
            'data'=> $itemResource
        ], HttpResponse::HTTP_OK);

//     $data = $request->all();
//     $ctdt = new ChuongTrinhDaoTao();
//     $ctdt->fill($data);
//     $ctdt->save();
//     $id = $ctdt->id;
//     return response()->json([
//      'data'=>$id
//  ], HttpResponse::HTTP_OK);
    }
    public function storeMTTQ(Request $request)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->updateMTTQ($request);
        $itemResource = SectionB_Resource::collection($item);
        return response()->json([
            'data'=>$itemResource
        ], HttpResponse::HTTP_OK);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showCTDT($id)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->getCTDT($id);
        $itemResource = ChuongTrinhDaoTaoResource::collection($item);
        return response()->json([
            'id'=>intval($id),
            'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }
    public function showMTTQ($id)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->getCTDT($id);
        $itemResource = SectionB_Resource::collection($item);
        return response()->json([
            'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }
    public function showHeader($id)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $itemHeader =  $ctdtService->getCTDT($id);
        $itemResource =SectionAHeader_Resource::collection($itemHeader);
        return response()->json([
            'id'=>intval($id),
           'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}